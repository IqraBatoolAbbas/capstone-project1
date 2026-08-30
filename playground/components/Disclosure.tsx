"use client";

import React, { useState, useId } from "react";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export const CustomDisclosure: React.FC<DisclosureProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border rounded-md max-w-md my-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      >
        <span>{title}</span>
        <span className="transform transition-transform duration-200">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      {isOpen && (
        <div id={contentId} className="p-4 border-t text-sm text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};