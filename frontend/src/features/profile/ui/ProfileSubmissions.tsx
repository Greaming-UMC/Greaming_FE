import Submissions from "./section/Submissions";

import {
  useCircleSubmissions,
  useMySubmissions,
  useUserSubmissions,
} from "../hooks";

import type { ProfileViewContext } from "../config/profileRoleConfig";
import type { SubmissionMetadata } from "../../../apis/types/common";
import type { UserSubmission } from "../../../apis/types/submission/getUserSubmissions";
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

const toSubmissionMetadata = (items: UserSubmission[]): SubmissionMetadata[] =>
  items.map((item) => ({
    submissionId: item.submissionId,
    thumbnailUrl: item.thumbnailUrl,
    counters: {
      likesCount: item.likesCount,
      commentCount: item.commentCount,
      bookmarkCount: item.bookmarkCount,
    },
    isLiked: false,
  }));

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
  const isCircleContext = context.type === "circle";
  const isOtherUserContext = context.type === "user" && context.role === "other";
  const isMyUserContext = context.type === "user" && context.role === "self";

  const circleQuery = useCircleSubmissions(
    isCircleContext ? circleId : undefined,
    { page: 1, size: 12 },
  );
  const userQuery = useUserSubmissions(
    isOtherUserContext ? userId : undefined,
    { page: 1, size: 12 },
  );
  const myQuery = useMySubmissions(
    { page: 1, size: 12 },
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
    const items = toSubmissionMetadata(userQuery.data?.result?.submissions ?? []);
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

  const items = toSubmissionMetadata(myQuery.data?.result?.submissions ?? []);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="main-title-small-emphasized text-on-surface">
        모든 그림
      </div>
      <Submissions
        items={withMock(items)}
        emptyMessage="포스팅한 그림이 없어요"
      />
    </div>
  );
};

export default ProfileSubmissions;
