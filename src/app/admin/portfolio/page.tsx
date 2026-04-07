export default function AdminPortfolioPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      <p className="text-muted-foreground">
        Portfolio management has been removed from the new design. The Portfolio model is no longer in use.
        You can re-add it if needed by updating the Prisma schema.
      </p>
    </div>
  );
}
