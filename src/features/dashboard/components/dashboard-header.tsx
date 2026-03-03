"use client";

import { useUser } from "@clerk/nextjs";
import { HeadphonesIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to see you</p>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:gandhi.sushant1408@gmail.com">
            <ThumbsUpIcon />
            Feedback
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:gandhi.sushant1408@gmail.com">
            <HeadphonesIcon />
            Need help?
          </Link>
        </Button>
      </div>
    </div>
  );
}

export { DashboardHeader };
