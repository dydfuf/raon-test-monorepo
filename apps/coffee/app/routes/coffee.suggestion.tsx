import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@raonc/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@raonc/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@raonc/ui/components/form";
import { Input } from "@raonc/ui/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CoffeeInfo, CoffeeInfoField } from "../types/coffee";
import { ActionFunctionArgs, MetaFunction, redirect } from "@vercel/remix";
import { Form as RemixForm, useFetcher } from "@remix-run/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@raonc/ui/components/alert-dialog";
import { useState } from "react";
import { cn } from "@raonc/ui/lib/utils";
import { createCoffeeInfo } from "../.server/notion/service";
import { siteConfig } from "../constant/common";
import { MessageBuilder, sendHook } from "../utils/discord";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta))
    .filter((meta) => !("description" in meta));

  return [
    ...parentMeta,
    {
      title: `${siteConfig.name} | 제안하기`,
      description: `${siteConfig.name}에서 제공하는 원두 정보를 제안해보세요!`,
    },
    {
      name: "description",
      content: `${siteConfig.name}에서 제공하는 원두 정보를 제안해보세요!`,
    },
  ];
};

const formSchema = z.object({
  name_kr: z.string().min(1, "이름(한글)은 필수 입력 사항입니다."),
  name_en: z.string(),
  note: z
    .string()
    .min(1, "노트는 필수 입력 사항입니다.")
    .refine((note) => {
      return note.split(",").length > 1;
    }, "노트는 쉼표(,)로 구분하여 입력해주세요."),
  region: z.string().optional(),
  farm: z.string().optional(),
  variety: z.string().optional(),
  process: z.string().optional(),
  source: z.string().optional(),
});

const CoffeeInfoDTO = z.object({
  [CoffeeInfoField.NAME_KR]: z.string(),
  [CoffeeInfoField.NAME_EN]: z.string(),
  [CoffeeInfoField.NOTE]: z.string(),
  [CoffeeInfoField.REGION]: z.string(),
  [CoffeeInfoField.FARM]: z.string(),
  [CoffeeInfoField.VARIETY]: z.string(),
  [CoffeeInfoField.PROCESS]: z.string(),
  [CoffeeInfoField.SOURCE]: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const body: z.infer<typeof formSchema> = await request.json();
  const { name_kr, name_en, note, region, farm, variety, process, source } =
    body;

  const coffeeInfo: Omit<
    CoffeeInfo,
    CoffeeInfoField.ID | CoffeeInfoField.USER_SUBMITTED
  > = CoffeeInfoDTO.parse({
    [CoffeeInfoField.NAME_KR]: name_kr,
    [CoffeeInfoField.NAME_EN]: name_en,
    [CoffeeInfoField.NOTE]: note,
    [CoffeeInfoField.REGION]: region,
    [CoffeeInfoField.FARM]: farm,
    [CoffeeInfoField.VARIETY]: variety,
    [CoffeeInfoField.PROCESS]: process,
    [CoffeeInfoField.SOURCE]: source,
  });

  const response = await createCoffeeInfo(coffeeInfo);
  let number = 0;
  if (response && "properties" in response) {
    // @ts-ignore
    number = response.properties[CoffeeInfoField.ID]?.unique_id.number;
  }

  const messageBuilder = new MessageBuilder();
  const discordMessage = messageBuilder
    .setTitle("새로운 원두 정보 추가 제안")
    .setColor("#00ff00")
    .setDescription(
      `새로운 원두 정보 추가 제안이 들어왔습니다.\n
      **한글명**: ${name_kr}
      **영문명**: ${name_en}
      **노트**: ${note}
      **지역**: ${region}
      **농장**: ${farm}
      **품종**: ${variety}
      **프로세싱**: ${process}
      **출처**: ${source}`
    );

  const hookUrl =
    "https://discord.com/api/webhooks/1235245232287780946/_2IoAt6_oOk1cV9C4G3p2CiQKpiHQpvnEHD1s9CGREvebkdInD9-Xu7CzZHnX6OQHRAt";
  await sendHook(hookUrl, discordMessage.getJSON());

  // Do something with the data
  return redirect(`/coffee/${number || 0}`);
}

export default function CoffeeSuggestionPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_en: "",
      name_kr: "",
      region: "",
      farm: "",
      variety: "",
      process: "",
      note: "",
      source: "",
    },
  });

  const fetcher = useFetcher();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentValues, setCurrentValues] =
    useState<z.infer<typeof formSchema>>();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentValues(values);
    setAlertDialogOpen(true);
  }

  type FormFieldItem = {
    name: keyof z.infer<typeof formSchema>;
    label: string;
    description: string;
    placeholder: string;
    className?: string;
  };
  const formFieldItems: FormFieldItem[] = [
    {
      name: "name_kr",
      label: CoffeeInfoField.NAME_KR,
      description: "원두명을 한글로 입력해주세요.",
      placeholder: "에티오피아 예가체프",
    },
    {
      name: "name_en",
      label: CoffeeInfoField.NAME_EN,
      description: "원두명을 입력해주세요.",
      placeholder: "Ethiopia Yirgacheffe",
    },
    {
      name: "note",
      label: CoffeeInfoField.NOTE,
      description: '노트를 ","로 구분하여 입력해주세요.',
      placeholder: "Bright, Floral, Sweet",
      className: "col-span-2",
    },
    {
      name: "region",
      label: CoffeeInfoField.REGION,
      description: "생산지를 입력해주세요.",
      placeholder: "Ethiopia",
    },
    {
      name: "farm",
      label: CoffeeInfoField.FARM,
      description: "농장명을 입력해주세요.",
      placeholder: "Kochere",
    },
    {
      name: "variety",
      label: CoffeeInfoField.VARIETY,
      description: "품종을 입력해주세요.",
      placeholder: "Heirloom",
    },
    {
      name: "process",
      label: CoffeeInfoField.PROCESS,
      description: "가공방법을 입력해주세요.",
      placeholder: "Washed",
    },
    {
      name: "source",
      label: CoffeeInfoField.SOURCE,
      description: "출처를 입력해주세요.",
      placeholder: "https://example.com",
      className: "col-span-2",
    },
  ];

  return (
    <div className="mx-auto flex items-center justify-center">
      <Form {...form}>
        <RemixForm
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4"
        >
          <Card className="w-full md:w-[40rem]">
            <CardHeader>
              <CardTitle className="text-3xl">추가 제안하기</CardTitle>
              <CardDescription>
                찾고있는 커피가 없나요?
                <br />
                아래 폼을 통해 원두 정보 추가를 제안해주세요!
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-8 gap-y-4">
              {formFieldItems.map((fieldItem) => (
                <FormField
                  key={fieldItem.name}
                  control={form.control}
                  name={fieldItem.name}
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        "flex flex-col justify-between",
                        fieldItem.className
                      )}
                    >
                      <FormLabel className="text-lg">
                        {fieldItem.label}
                      </FormLabel>
                      <FormDescription className="!m-0">
                        {fieldItem.description}
                      </FormDescription>
                      <FormControl>
                        <Input placeholder={fieldItem.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="w-full">
                추가 제안하기
              </Button>
            </CardFooter>
          </Card>
        </RemixForm>
      </Form>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              입력한 정보가 맞나요?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentValues && (
                <Card>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6">
                      {formFieldItems.map((fieldItem) => (
                        <div
                          className={cn(
                            "flex flex-col items-start",
                            fieldItem.className
                          )}
                          key={fieldItem.name}
                        >
                          <label className="text-lg">{fieldItem.label}</label>
                          <Input
                            placeholder={"-"}
                            readOnly
                            value={currentValues[fieldItem.name]}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니에요</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!currentValues) return;
                fetcher.submit(currentValues, {
                  method: "POST",
                  encType: "application/json",
                });
              }}
            >
              맞아요
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
