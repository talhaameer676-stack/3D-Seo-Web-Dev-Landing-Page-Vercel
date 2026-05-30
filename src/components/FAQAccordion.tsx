import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  return (
    <Accordion.Root type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="liquid-glass rounded-2xl border border-white/10 overflow-hidden font-body"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-white hover:bg-white/[0.02] transition-colors focus:outline-none group cursor-pointer border-none bg-transparent">
              <span className="text-base md:text-lg font-light text-white/90">{item.question}</span>
              <ChevronDown className="w-4.5 h-4.5 text-white/40 group-data-[state=open]:rotate-180 transition-transform duration-300 shrink-0" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="px-6 pb-5 pt-1 text-sm font-light text-white/60 leading-relaxed">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
