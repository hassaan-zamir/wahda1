export default function AdminBlogsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
      <p className="text-muted-foreground">
        Blog management has been removed from the new design. The Blog model is no longer in use.
        You can re-add it if needed by updating the Prisma schema.
      </p>
    </div>
  );
}
