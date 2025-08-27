import { CreateNotebookButton } from "@/components/create-notebook-button";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";

export default async function page() {
  const notebooks = await getNotebooks();
  console.log(notebooks);
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <h1>Notebooks</h1>
      <CreateNotebookButton />

      {notebooks.success && notebooks?.notebooks?.map((notebook) => (
        <div key={notebook.id} className="p-4 border rounded">{notebook.name}</div>
      ))}

      {notebooks.success && notebooks?.notebooks?.length === 0 && (
        <div className="p-4">No notebooks found</div>
      )}
    </PageWrapper>
  );
}
