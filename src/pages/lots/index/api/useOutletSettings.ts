import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { useMe } from '@/app/providers/me/useMe';

export interface outletSettingsArgs {
  filters?: {
    liked: boolean,
    q: {
      vehicle_vehicle_model_id_eq: string | null,
      vehicle_vehicle_brand_id_eq: string | null,
      vehicle_city_of_remarketing_id_eq: string | null
    }
  },
  filters_enabled?: boolean,
  view_type?: 'table_view' | 'cards_view'
}

export const useOutletSettings = () => {
  const { me, setMe } = useMe();

  const { mutate: mutateOutletSettings, status: statusOutletSettings } = useMutation({
    mutationFn: async (args: outletSettingsArgs) => {
      const { data } = await api.patch(`outlet/users/${me.id}/outlet_user_settings`, { outlet_user_setting: args });
      return data;
    },
    onMutate: async (newSettings) => {
      setMe((oldMe) => ({
        ...oldMe,
        outlet_user_setting: { ...oldMe.outlet_user_setting, ...newSettings },
      }));
    },
  });

  return { mutateOutletSettings, statusOutletSettings };
};