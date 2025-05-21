import { parseISO, format } from "date-fns";

interface FormatDateProps {
  dateString?: string;
}

export default function FormatDate({
  dateString,
}: FormatDateProps): JSX.Element {
  if (!dateString) {
    return <time>Invalid Date</time>;
  }

  try {
    const date = parseISO(dateString);
    return (
        <time dateTime={dateString} className="text-blue-dark dark:text-white">
            {format(date, "d LLLL yyyy")}
        </time>
    );
  } catch {
    return <time>Invalid Date</time>;
  }
}
