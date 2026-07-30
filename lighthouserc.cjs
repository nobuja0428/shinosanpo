import { Breadcrumbs } from "./Breadcrumbs";

export function PolicyLayout({
  eyebrow,
  title,
  lead,
  children
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page policy">
      <Breadcrumbs items={[{ label: title }]} />
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      {children}
    </div>
  );
}
