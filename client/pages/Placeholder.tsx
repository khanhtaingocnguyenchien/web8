export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-md text-center py-10">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Tính năng sẽ sớm ra mắt.</p>
      )}
    </div>
  );
}
