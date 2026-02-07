import type { ProfileViewerRole, CircleViewerRole } from "../../../types/role";

export type ProfileViewContext =
  | { type: "user"; role: ProfileViewerRole }
  | { type: "circle"; role: CircleViewerRole };

const userBase = {
    showUsagePurpose: true,
    showCircleLeader: false,
    showApplyButton: false,
    showCalendar: true,
}

const circleBase = {
    showUsagePurpose: false,
    showCircleLeader: true,
    showSubmissionTab: false,
    showCalendar: false,
    showFollowButton: false,
};

export const PROFILE_VIEW_CONFIG = {
  user: {
    self: { ...userBase, 
        showEditButton: true,      
        showFollowButton: false,
        showSubmissionTab: true,
    },
    other: { ...userBase,
        showEditButton: false,       
        showFollowButton: true,
        showSubmissionTab: false,
    },
  },

  circle: {
    leader: { ...circleBase, 
        showEditButton: true, 
        showApplyButton: false 
    },
    member: { ...circleBase, 
        showEditButton: false, 
        showApplyButton: false 
    },
    guest:  { ...circleBase, 
        showEditButton: false, 
        showApplyButton: true 
    },
  },
} as const;
