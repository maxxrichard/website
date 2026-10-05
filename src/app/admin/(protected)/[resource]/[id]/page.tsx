import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getResource } from "@/lib/resources";
import { saveRecord, deleteRecord } from "../../actions";
import ResourceForm from "@/components/admin/ResourceForm";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function EditRecordPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;
  const res = getResource(resource);
  const numId = Number(id);
  if (!res || !Number.isInteger(numId)) notFound();
  const table = schema[res.table] as unknown as { id: never };
  const rows = (await db.select().from(table as never).where(eq(table.id, numId as never)).limit(1)) as Record<string, unknown>[];
  const record = rows[0];
  if (!record) notFound();
  async function action(formData: FormData) { "use server"; await saveRecord(resource, numId, formData); }
  async function remove() { "use server"; await deleteRecord(resource, numId); const { redirect } = await import("next/navigation"); redirect(`/admin/${resource}`); }
  return (
    <>
      <div className="adm-header">
        <div><h1>Edit {res.singular.toLowerCase()}</h1><p><Link href={`/admin/${res.key}`}>← Back to {res.label.toLowerCase()}</Link></p></div>
        <DeleteButton onDelete={remove} />
      </div>
      <ResourceForm res={res} record={record} action={action} />
    </>
  );
}
