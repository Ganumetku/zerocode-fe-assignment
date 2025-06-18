import { DEFAULT_PROMPT_TEMPLATES } from '@/utils/constants';

interface PromptTemplatesProps {
  onSelect?: (template: string) => void;
}

export default function PromptTemplates({ onSelect }: PromptTemplatesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Prompt Templates</h3>
      <div className="grid grid-cols-1 gap-2">
        {DEFAULT_PROMPT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelect?.(template)}
            className="p-3 text-left bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
}