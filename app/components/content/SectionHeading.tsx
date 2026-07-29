interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'blue' | 'green';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'green',
}: SectionHeadingProps) {
  const eyebrowColour = tone === 'blue' ? 'text-blue-700' : 'text-emerald-700';

  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-bold uppercase tracking-[0.16em] ${eyebrowColour}`}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
