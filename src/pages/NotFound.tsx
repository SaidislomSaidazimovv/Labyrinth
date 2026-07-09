import { Link } from "react-router-dom";

/** An empty screen is an invitation to act. Even this one. */
const NotFound = () => (
  <main
    data-act="maze"
    className="grid min-h-screen place-items-center bg-background px-6 text-center"
  >
    <div>
      <p className="label">Section not found</p>

      <h1 className="mt-8 font-display text-5xl text-foreground md:text-7xl">404</h1>

      <p className="mx-auto mt-8 max-w-md leading-relaxed text-muted-foreground">
        The walls moved. Nothing is here tonight, and nothing survives a night in
        the maze.
      </p>

      <Link
        to="/"
        className="mt-12 inline-block border border-accent-c px-6 py-3 font-mono text-xs text-accent-c transition-colors hover:bg-accent-c hover:text-accent-ink"
      >
        Back to the Glade
      </Link>
    </div>
  </main>
);

export default NotFound;
