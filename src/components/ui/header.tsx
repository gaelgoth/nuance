import { Button } from "@/components/ui/button";

const GITHUB_URL = "https://github.com/gaelgoth/nuance";

export function Header() {
  return (
    <header className="flex items-center justify-between max-w-5xl mx-auto mt-6 mb-8 px-8 py-4 bg-white shadow-sm rounded-b-2xl">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Nuance
      </h1>
      <Button
        asChild
        variant="outline"
        className="gap-2 border-gray-200 hover:bg-gray-100"
      >
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <svg
            height="20"
            width="20"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
      </Button>
    </header>
  );
}
