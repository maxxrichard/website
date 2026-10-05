import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource } from "@/lib/resources";
import { saveRecord } from "../../actions";
import ResourceForm from "@/components/admin/ResourceForm";

export default async function NewRecordPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const res = getResource(resource);
  if (!res) notFound();
  async function action(formData: FormData) { "use server"; await saveRecord(resource, null, formData); }
  return (
    <>
      <div className="adm-header"><div><h1>New {res.singular.toLowerCase()}</h1><p><Link href={`/admin/${res.key}`}>← Back to {res.label.toLowerCase()}</Link></p></div></div>
      <ResourceForm res={res} record={null} action={action} />
    </>
  );
}
