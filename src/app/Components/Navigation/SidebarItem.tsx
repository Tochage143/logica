import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function SidebarItem({ name, Icon, link, expanded }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={link}
          className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-all group"
        >
          <Icon className="text-xl" />
          {expanded && <span className="ml-3">{name}</span>}
        </a>
      </TooltipTrigger>
      {!expanded && <TooltipContent side="right">{name}</TooltipContent>}
    </Tooltip>
  );
}
