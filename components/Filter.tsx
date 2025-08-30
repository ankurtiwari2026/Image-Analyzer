import { Filter as FilterIcon } from 'lucide-react';

type Props = {
  value: number;
  setValue: (v: number) => void;
};

export default function Filter({ value, setValue }: Props) {
  return (
    <div className="flex items-center gap-4">
      <FilterIcon className="w-5 h-5 text-gray-500" />
      <span className="text-gray-700 font-medium">Min Similarity: {(value * 100).toFixed(0)}%</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="w-40 accent-blue-600"
      />
    </div>
  );
}
