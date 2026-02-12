import { useState } from "react";

import TabButtons from "../components/TabButtons";

import Submissions from "./section/Submissions";

import {
  useCircleSubmissions,
  useMySubmissions,
  useUserSubmissions,
} from "../hooks";

import type { ProfileViewContext } from "../config/profileRoleConfig";
import type {
  CheckMySubmissionType,
  SubmissionMetadata,
} from "../../../apis/types/common";
import mockFeed from "../../../assets/background/mock_feed.jpg";

const USE_MOCK_FEED = false;
const MOCK_COUNTERS = { likesCount: 10, commentCount: 10, bookmarkCount: 10 };
const MOCK_ITEMS: SubmissionMetadata[] = Array.from({ length: 12 }, (_, index) => ({
  submissionId: -(index + 1),
  thumbnailUrl: mockFeed,
  counters: MOCK_COUNTERS,
  isLiked: false,
}));
const mockAuthorById = (items: SubmissionMetadata[]) =>
  Object.fromEntries(
    items.map((item) => [item.submissionId, { name: "닉네임", avatarUrl: "" }]),
  );

const withMock = (items: SubmissionMetadata[]) =>
  USE_MOCK_FEED ? (items.length > 0 ? items : MOCK_ITEMS) : items;

type ProfileSubmissionsProps = {
  context: ProfileViewContext;
  userId?: number;
  circleId?: number;
};

const ProfileSubmissions = ({
  context,
  userId,
  circleId,
}: ProfileSubmissionsProps) => {
  const [type, setType] = useState<CheckMySubmissionType>("ALL");
  const isCircleContext = context.type === "circle";
  const isOtherUserContext = context.type === "user" && context.role === "other";
  const isMyUserContext = context.type === "user" && context.role === "self";

  const circleQuery = useCircleSubmissions(
    isCircleContext ? circleId : undefined,
    { page: 1, size: 12 },
  );
  const userQuery = useUserSubmissions(
    isOtherUserContext ? userId : undefined,
    { type: "ALL", page: 1, size: 12 },
  );
  const myQuery = useMySubmissions(
    { type, page: 1, size: 12 },
    { enabled: isMyUserContext },
  );

  if (isCircleContext) {
    if (typeof circleId !== "number") return null;
    const rawItems = circleQuery.data?.result?.circle_list ?? [];
    const items: SubmissionMetadata[] =
      rawItems.map((item) => ({
        submissionId: item.submissionId,
        thumbnailUrl: item.thumbnail_Url,
        counters: item.counters,
        isLiked: item.isLiked,
      })) ?? [];
    const baseAuthorById = Object.fromEntries(
      rawItems.map((item) => [
        item.submissionId,
        { name: item.artist_name, avatarUrl: item.profile_Url },
      ]),
    );
    const mappedItems = withMock(items);
    const authorById =
      Object.keys(baseAuthorById).length > 0
        ? baseAuthorById
        : mockAuthorById(mappedItems);

    return (
      <div className="flex flex-col gap-[24px]">
        <div className="main-title-small-emphasized text-on-surface">
          모든 그림
        </div>
        <Submissions
          items={mappedItems}
          showAuthor
          authorById={authorById}
          emptyMessage="써클에 포스팅된 그림이 없어요"
        />
      </div>
    );
  }

  if (isOtherUserContext) {
    if (typeof userId !== "number") return null;
    const items = userQuery.data?.result?.submission_list ?? [];
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="main-title-small-emphasized text-on-surface">
          모든 그림
        </div>
        <Submissions
          items={withMock(items)}
          emptyMessage="작가의 포스팅한 그림이 없어요"
        />
      </div>
    );
  }

  const items = myQuery.data?.result?.submission_list ?? [];

  return (
    <div className="flex flex-col gap-[24px]">
      <TabButtons value={type} onChange={setType} />
      <Submissions
        items={withMock(items)}
        showAuthor={type === "SAVED"}
        authorById={type === "SAVED" ? mockAuthorById(withMock(items)) : undefined}
        emptyMessage={
          type === "SAVED"
            ? "저장된 그림이 없어요"
            : "포스팅한 그림이 없어요"
        }
      />
    </div>
  );
};

export default ProfileSubmissions;
