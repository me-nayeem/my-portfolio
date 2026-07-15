export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading relative inline-block pb-2.5 text-2xl font-extrabold tracking-[-0.02em] after:absolute after:bottom-0 after:left-1/2 after:h-0.75 after:w-14 after:-translate-x-1/2 after:rounded-full after:bg-(image:--gradient) sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
