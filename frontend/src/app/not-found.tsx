import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-on-surface">
      <h2 className="font-display-lg text-[120px] text-primary/20 mb-md leading-none select-none">404</h2>
      <h3 className="font-headline-md text-headline-md mb-xs">Page Not Found</h3>
      <p className="font-body-md text-on-surface-variant mb-xl text-center max-w-md">
        The requested archival record could not be located in the catalog system.
      </p>
      <Link
        href="/"
        className="bg-primary text-on-primary font-label-caps px-xl py-sm rounded-md uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(176,141,87,0.2)]"
      >
        Return to Catalog
      </Link>
    </div>
  );
}
