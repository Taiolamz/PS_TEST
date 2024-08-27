import { Badge } from "@/components/ui/badge";

interface prop {
  status: string;
}
const EditableLabel = ({ status }: prop) => {
  return (
    <Badge
      variant={
        status.toLowerCase() === "rejected"
          ? "danger"
          : status.toLowerCase() === "approved"
          ? "success"
          : "pending"
      }
      className={`select-none w-fit text-xs capitalize ${
        status.toLowerCase() === "rejected"
          ? "border border-[var(--text-danger)]"
          : ""
      }`}
    >
      {status}
    </Badge>
  );
};

export default EditableLabel;
