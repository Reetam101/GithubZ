"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const onSubmit = (data: FormInput) => {
    console.log("data: ", data);
    createProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          reset();
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
    return true;
  };

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/github_undraw.svg" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your GitHub Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to Githubz.
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Repository URL"
            />
            <div className="h-2"></div>
            <Input
              {...register("repoUrl", { required: true })}
              type="url"
              placeholder="Github URL"
            />
            <div className="h-2"></div>
            <Input
              {...register("githubToken")}
              placeholder="Github Token (optional)"
            />
            <div className="h-4"></div>
            <Button type="submit">Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
