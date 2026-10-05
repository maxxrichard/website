import { getMessages } from "@/lib/queries";
import { markMessageRead, deleteMessage } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ToggleButton from "@/components/admin/ToggleButton";

export default async function MessagesPage() {
  const msgs = await getMessages();
  return (
    <>
      <div className="adm-header"><div><h1>Messages</h1><p>Submissions from the contact form.</p></div></div>
      <div className="adm-card">
        {msgs.length === 0 && <p className="adm-muted">No messages yet.</p>}
        {msgs.map((m) => (
          <div className="adm-msg" key={m.id}>
            <div className="meta">
              <strong style={{ color: "var(--adm-text)" }}>{m.fullName}</strong>
              <a href={`mailto:${m.email}`} style={{ color: "var(--adm-accent)" }}>{m.email}</a>
              <span>{new Date(m.createdAt).toLocaleString()}</span>
              <ToggleButton value={m.read} onLabel="Read" offLabel="Unread" onToggle={async (v) => { "use server"; await markMessageRead(m.id, v); }} />
              <DeleteButton onDelete={async () => { "use server"; await deleteMessage(m.id); }} />
            </div>
            <div className="body">{m.message}</div>
          </div>
        ))}
      </div>
    </>
  );
}
