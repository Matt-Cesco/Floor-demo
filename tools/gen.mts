// tools/gen.mts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env (from project root)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ENV
const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;
if (!WP_BASE) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL is not set in .env");
}

console.log("Using NEXT_PUBLIC_WORDPRESS_BASE_URL:", WP_BASE);

// PATHS
const flexibleBlocksDir = path.resolve(__dirname, "../src/Components/FlexibleBlocks");
const helpersDir = path.resolve(__dirname, "../src/Helpers");

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("Created directory:", dir);
    }
}

function toPascalCase(str: string): string {
    return str
        .split(/[_-]/)
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
}

function acfTypeToTsType(field: any): string {
    const type = field.type as string | undefined;
    const choices = field.choices ? Object.keys(field.choices) : null;

    // Ignore ACF "tab" fields (no name, just UI)
    if (type === "tab") {
        return "never"; // we won't emit these as properties
    }

    // Literal unions for selects/radios/button groups with choices
    if (["select", "radio", "button_group"].includes(type ?? "") && choices?.length) {
        const literals = choices.map((c) => `'${c}'`).join(" | ");
        return literals;
    }

    // Helper: build object from sub_fields
    const buildObjectFromSubFields = (subFields: any[]): string => {
        const meaningfulSubFields = (subFields || []).filter((sf) => sf.name); // skip empty-name (tabs etc.)

        if (!meaningfulSubFields.length) {
            return "Record<string, any>";
        }

        const lines = meaningfulSubFields
            .map((sf) => {
                const tsType = acfTypeToTsType(sf); // RECURSION
                // If this is a tab, it will be "never", so skip it
                if (tsType === "never") return null;

                const optional = sf.required ? "" : "?";
                return `    ${sf.name}${optional}: ${tsType}; // ${sf.label} (${sf.type})`;
            })
            .filter(Boolean) as string[];

        if (!lines.length) {
            return "Record<string, any>";
        }

        return `{\n${lines.join("\n")}\n  }`;
    };

    // GROUP → nested object
    if (type === "group") {
        const subFields: any[] = Array.isArray(field.sub_fields) ? field.sub_fields : [];
        return buildObjectFromSubFields(subFields);
    }

    // REPEATER → array of nested object
    if (type === "repeater") {
        const subFields: any[] = Array.isArray(field.sub_fields) ? field.sub_fields : [];
        const itemType = buildObjectFromSubFields(subFields);
        return `${itemType}[]`;
    }

    // FLEXIBLE CONTENT (inside groups, if ever) → any[]
    if (type === "flexible_content") {
        return "any[]";
    }

    // Simple scalar-ish fields
    switch (type) {
        case "text":
        case "textarea":
        case "wysiwyg":
        case "url":
        case "email":
        case "post_object":
        case "page_link":
        case "relationship":
        case "taxonomy":
            return "string";
        case "number":
        case "range":
            return "number";
        case "true_false":
            return "boolean";

        case "link":
            // ACF link field
            return "{ url: string; title?: string; target?: string | null }";

        case "image":
            switch (field.return_format) {
                case "id":
                    return "number";
                case "url":
                    return "string";
                case "array":
                    return "MediaItem";
                default:
                    return "MediaItem | number | string";
            }

        case "gallery":
            // always MediaItem[]
            return "MediaItem[]";

        case "file":
            switch (field.return_format) {
                case "id":
                    return "number";
                case "url":
                    return "string";
                case "array":
                default:
                    return "Record<string, any>";
            }

        default:
            return "any";
    }
}

async function generateFlexibleBlocksFromAcf() {
    ensureDir(flexibleBlocksDir);
    ensureDir(helpersDir);

    const endpoint = `${WP_BASE}/wp-json/headless/v1/flexible-layouts`;
    console.log(`Fetching ACF flexible layouts from: ${endpoint}`);

    let res: Response;
    try {
        res = await fetch(endpoint);
    } catch (err) {
        console.error("Fetch to flexible-layouts failed:", err);
        throw err;
    }

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Flexible-layouts response status:", res.status, res.statusText);
        console.error("Body:", text);
        throw new Error(`Failed to fetch flexible layouts: ${res.status} ${res.statusText}`);
    }

    const layouts: any[] = await res.json();
    console.log("Flexible layouts count:", layouts.length);

    if (!Array.isArray(layouts) || layouts.length === 0) {
        console.warn("No layouts returned from headless/v1/flexible-layouts. Nothing to generate.");
    }

    const blockComponentImports: string[] = [];
    const blockInterfaceImports: string[] = [];
    const switchCases: string[] = [];
    const unionTypes: string[] = [];

    for (const layout of layouts) {
        const layoutName: string = layout.layout_name; // acf_fc_layout
        if (!layoutName) {
            console.warn("Layout without layout_name, skipping:", layout);
            continue;
        }

        const blockBaseName = `${toPascalCase(layoutName)}Block`;
        const interfaceName = `I${blockBaseName}`;
        const blockFolder = path.join(flexibleBlocksDir, blockBaseName);
        ensureDir(blockFolder);

        const subFields: any[] = layout.sub_fields ?? [];
        console.log(`Layout "${layoutName}" → ${blockBaseName}, sub_fields: ${subFields.length}`);

        // ---------- Interface generation ----------
        const interfacePath = path.join(blockFolder, `${interfaceName}.ts`);

        const fieldsLines = subFields
            .map((field) => {
                const tsType = acfTypeToTsType(field);
                const optional = field.required ? "" : "?";
                return `  ${field.name}${optional}: ${tsType}; // ${field.label} (${field.type})`;
            })
            .join("\n");

        const needsMediaItem = fieldsLines.includes("MediaItem");

        const interfaceContent = `// Auto-generated from ACF field group config
${needsMediaItem ? `import MediaItem from "@/Types/MediaItem";\n\n` : ""}export default interface ${interfaceName} {
  acf_fc_layout: '${layoutName}';
${fieldsLines ? fieldsLines + "\n" : ""}
}
`;

        // Only create interface if it does NOT exist yet
        if (!fs.existsSync(interfacePath)) {
            fs.writeFileSync(interfacePath, interfaceContent, "utf8");
            console.log(`✔ Interface created: ${interfacePath}`);
        } else {
            console.log(`ℹ Interface exists, skipped: ${interfacePath}`);
        }

        // ---------- Component generation (only if missing) ----------
        const componentPath = path.join(blockFolder, `${blockBaseName}.tsx`);

        if (!fs.existsSync(componentPath)) {
            const destructureLines: string[] = [];

            // 1) Non-group top-level fields → destructure from data
            const nonGroupNames = subFields.filter((sf: any) => sf.type !== "group" && sf.name).map((sf: any) => sf.name as string);

            if (nonGroupNames.length) {
                // e.g. const { some_field, another_field } = data;
                destructureLines.push(`  const { ${nonGroupNames.join(", ")} } = data;`);
            }

            // 2) For each top-level group field, destructure its immediate children from data.<groupName>
            subFields
                .filter((sf: any) => sf.type === "group" && Array.isArray(sf.sub_fields))
                .forEach((groupField: any) => {
                    const groupName = groupField.name as string | undefined;
                    if (!groupName) return;

                    const childNames = (groupField.sub_fields || []).filter((sf: any) => sf.name && sf.type !== "tab").map((sf: any) => sf.name as string);

                    if (childNames.length) {
                        // e.g. const { units } = data.available_units_fields || {};
                        destructureLines.push(`  const { ${childNames.join(", ")} } = data.${groupName} || {};`);
                    }
                });

            const destructuringBlock = destructureLines.length > 0 ? destructureLines.join("\n") + "\n\n" : "";

            const componentContent = `
import ${interfaceName} from "./${interfaceName}";
import IFlexibleBlock from "../IFlexibleBlock";

const ${blockBaseName} = ({ data }: IFlexibleBlock<${interfaceName}>) => {
${destructuringBlock}  return (
    <section>
      <p>Block: ${blockBaseName}</p>
    </section>
  );
};

export default ${blockBaseName};
`;
            fs.writeFileSync(componentPath, componentContent, "utf8");
            console.log(`✔ Component created: ${componentPath}`);
        } else {
            console.log(`Component exists, skipped: ${componentPath}`);
        }

        // Collect imports for shared files
        blockComponentImports.push(`import ${blockBaseName} from "@/Components/FlexibleBlocks/${blockBaseName}/${blockBaseName}";`);
        blockInterfaceImports.push(`import ${interfaceName} from "@/Components/FlexibleBlocks/${blockBaseName}/${interfaceName}";`);

        switchCases.push(`    case FlexibleBlocksEnum.${blockBaseName.toUpperCase()}:
      return <${blockBaseName} data={data as ${interfaceName}} />;`);

        unionTypes.push(interfaceName);
    }

    // IFlexibleBlock.ts (create once)
    const iFlexibleBlockPath = path.join(flexibleBlocksDir, "IFlexibleBlock.ts");
    if (!fs.existsSync(iFlexibleBlockPath)) {
        const iFlexibleBlockContent = `export default interface IFlexibleBlock<T extends { acf_fc_layout: string }> {
  data: T;
}
`;
        fs.writeFileSync(iFlexibleBlockPath, iFlexibleBlockContent, "utf8");
        console.log(`✔ Created ${iFlexibleBlockPath}`);
    }

    // FlexibleBlocksEnum.ts (overwrite)
    const enumPath = path.join(flexibleBlocksDir, "FlexibleBlocksEnum.ts");
    const enumEntries = layouts
        .filter((layout) => layout.layout_name)
        .map((layout) => {
            const layoutName: string = layout.layout_name;
            const blockBaseName = `${toPascalCase(layoutName)}Block`;
            const enumKey = blockBaseName.toUpperCase();
            return `  ${enumKey} = "${layoutName}"`;
        })
        .join(",\n");

    const enumContent = `export enum FlexibleBlocksEnum {
${enumEntries}
}

export default FlexibleBlocksEnum;
`;
    fs.writeFileSync(enumPath, enumContent, "utf8");
    console.log(`✔ Wrote ${enumPath}`);

    // AllBlockDataTypes.ts (overwrite)
    const allBlockDataTypesPath = path.join(flexibleBlocksDir, "AllBlockDataTypes.ts");
    const interfaceImportsForUnion = unionTypes
        .map((iface) => `import ${iface} from "@/Components/FlexibleBlocks/${iface.replace(/^I/, "")}/${iface}";`)
        .join("\n");

    const allBlockDataTypesContent = `${interfaceImportsForUnion}

export type AllBlockDataTypes =
  ${unionTypes.join(" |\n  ")};
`;
    fs.writeFileSync(allBlockDataTypesPath, allBlockDataTypesContent, "utf8");
    console.log(`✔ Wrote ${allBlockDataTypesPath}`);

    // GetFlexibleBlock.tsx (overwrite)
    const getFlexibleBlockPath = path.join(helpersDir, "GetFlexibleBlock.tsx");
    const getFlexibleBlockContent = `import React from "react";
import FlexibleBlocksEnum from "@/Components/FlexibleBlocks/FlexibleBlocksEnum";
import { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import IFlexibleBlock from "@/Components/FlexibleBlocks/IFlexibleBlock";

${blockComponentImports.join("\n")}
${blockInterfaceImports.join("\n")}

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
  if (!data || !data.acf_fc_layout) {
    console.warn("FlexibleBlock data is missing or acf_fc_layout is undefined.");
    return null;
  }

  switch (data.acf_fc_layout) {
${switchCases.join("\n")}
    default:
      console.warn(\`Unknown block layout: \${data.acf_fc_layout}\`);
      return null;
  }
};

export default GetFlexibleBlock;
`;
    fs.writeFileSync(getFlexibleBlockPath, getFlexibleBlockContent, "utf8");
    console.log(`✔ Wrote ${getFlexibleBlockPath}`);
}

generateFlexibleBlocksFromAcf().catch((err) => {
    console.error("gen script failed:", err);
    process.exit(1);
});
