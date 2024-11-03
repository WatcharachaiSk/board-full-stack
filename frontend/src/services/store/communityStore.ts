// services/store/communityStore.ts
import { Community, fetchCommunities } from '@services/api/communityService';
import { create } from 'zustand';

interface CommunityState {
  communities: Community[];
  fetchCommunities: () => Promise<void>;
}

const useCommunityStore = create<CommunityState>((set) => ({
  communities: [],
  fetchCommunities: async () => {
    const communities = await fetchCommunities();
    set({ communities });
  }
}));

export default useCommunityStore;
