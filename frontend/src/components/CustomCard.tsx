import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CustomCardProps = {
  cardTitle: string;
  cardDescription?: string;
  children: React.ReactNode;
  cardFooter?: React.ReactNode;
  cardAction?: React.ReactNode;
  className?: string;
};

export default function CustomCard({
  cardTitle,
  cardDescription,
  children,
  cardFooter,
  cardAction,
  className,
}: CustomCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
        {cardAction && <CardAction>{cardAction}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
}
