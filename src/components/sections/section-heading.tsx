type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="font-heading relative inline-block pb-2.5 text-2xl font-extrabold tracking-[-0.02em] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-14 after:rounded-full after:bg-(image:--gradient) sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-3 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
