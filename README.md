# barques

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Setup

Firstable, you need to go in wordpress under graphql and tick on enable public introspection

## Layout Options

options in wordpress must be named Layout Options (graphQL field layoutOptions) and every option must be stored there and named Options (like Image Options, Color Options, etc)

You MUST call the group Layout Options for the automation.

## Heading

The DynamicHeading component in wordpress will be Heading. Inside the heading in ACF there will be Heading Text and Heading Tag.
There will be an Enum for that so when you create the content don't put title. it will work only if you write heading with inside the select for Heading Tag and the text field for Heading Text.

In ACF the Heading must be a group and inside Heading Text will be a Text filed and Heading Tag will be a Select field.

You MUST respect this structure and naming for the automation.

## Link

DON'T USE THE WORD LINK FOR THE NAME OF THE BLOCK. USE BUTTON INSTEAD

if you have to create a link must be named link or Link. There must be the word link inside capital or not. Example: 'link' - 'pageLink' - 'projectLink'

## Image

if you have to create an image must be named image or Image. There must be the word image inside capital or not. Example: 'image' - 'pageImage' - 'projectImage'

## svg

for svg you can use the dynamic image component outside the flexible blocks.

the query must be:

logo {
node {
mediaItemUrl
mediaType
mimeType
}
}

the nimeType is crucial because the structure of dynamic image
