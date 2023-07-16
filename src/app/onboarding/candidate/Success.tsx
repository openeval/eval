import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

export function Success({ onSuccess }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Congratulations</CardTitle>
      </CardHeader>
      <CardContent>Your account is ready !</CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            onSuccess();
          }}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
