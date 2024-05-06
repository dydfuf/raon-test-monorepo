import Todo from "../../components/Todo";
import { TodoList } from "../../components/Todo/type";
import { Container, Heading, Section, Text } from "@radix-ui/themes";
import React from "react";

export default function TodoPage() {
  const TODO_LISTS: TodoList[] = [
    { label: "검색 기능 추가", status: "TODO" },
    {
      label: "다크 모드 지원",
      status: "DONE",
      description: "2023-09-17 작업 완료",
    },
    { label: "TODO 페이지 분리", status: "DONE" },
    {
      label: "포스팅에 이미지 추가",
      status: "TODO",
      description: "dynamic open-graph를 지원해야 한다.",
    },
    { label: "Notion API 활용하여 글 배포 자동화하기", status: "TODO" },
    { label: "About me 페이지에 경력 및 스킬 추가", status: "TODO" },
  ];

  return (
    <Section pt={"7"}>
      <Heading as="h1" size={"8"}>
        <Text> Raon.dev 기술 블로그 개선 사항 TODO List 입니다.</Text>
      </Heading>
      <Container pt={"5"}>
        <Todo lists={TODO_LISTS} />
      </Container>
    </Section>
  );
}
