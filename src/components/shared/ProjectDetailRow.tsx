import "./ProjectDetailRow.css";

interface ProjectDetailRowProps {
  label: "Role" | "Impact" | "Challenge";
  value: string;
}

export default function ProjectDetailRow({
  label,
  value,
}: ProjectDetailRowProps) {
  if (!value.trim()) return null;

  return (
    <div className="project-detail-row">
      <span className="project-detail-row__label">{label}</span>
      <p className="project-detail-row__value">{value}</p>
    </div>
  );
}
