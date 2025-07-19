import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: ReactNode;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  change,
  changeType,
  icon,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-sm font-medium mt-1",
                  changeType === "increase" ? "text-green-600" : "text-red-600",
                )}
              >
                {changeType === "increase" ? "+" : "-"}
                {change}
              </p>
            )}
          </div>
          <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
