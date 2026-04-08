"use client";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  if (!items || items.length === 0) return null;

  return (
    <aside className="lg:w-full">
      <div className="sticky top-32 space-y-8">
        <div className="bg-white rounded-xl p-6 border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">
            Table of Contents
          </h3>

          <nav className="space-y-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
