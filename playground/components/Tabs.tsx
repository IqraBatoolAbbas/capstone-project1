"use client";

import React, { useState, useRef } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export const CustomTabs: React.FC<TabsProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + items.length) % items.length;
    }

    if (newIndex !== index) {
      setActiveIndex(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <div className="w-full max-w-md border rounded-lg p-4">
      <div role="tablist" aria-label="Sample Tabs" className="flex border-b gap-2">
        {items.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[idx] = el)}
            role="tab"
            aria-selected={activeIndex === idx}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeIndex === idx ? 0 : -1}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeIndex === idx
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {items.map((tab, idx) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIndex !== idx}
          className="py-4 text-sm text-gray-700"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};