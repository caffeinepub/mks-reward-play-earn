import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
}

export default function ActionCard({
  icon,
  title,
  description,
  gradient,
  onClick,
}: ActionCardProps) {
  return (
    <Card
      className={`bg-gradient-to-br ${gradient} border-white/20 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer group`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
              {icon}
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">{title}</h3>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
