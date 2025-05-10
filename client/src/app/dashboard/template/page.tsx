import ModalButton from "@/components/modal-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import speeches from "@/data/speeches.json";

function page() {
  return (
    <>
      <section className="w-full flex items-center justify-center">
        <Card className="w-full lg:w-[60%]">
          <CardHeader>
            <CardTitle>Create Speech</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {speeches.map((category, index) => (
              <div className="w-full space-y-3" key={category.category}>
                <h3 className="text-sm">{category.category}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {category.speechs.map((speech, index) => (
                    <ModalButton speech={speech} key={index} />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </>
  );
}

export default page;
