import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { type ProfileDto } from "~/dto/ProfileDto";
import { ProfileForm } from "./ProfileForm";

type ProfilePageProps = {
  data: { profile: ProfileDto };
};

export const ProfilePage = ({ data }: ProfilePageProps) => {
  return (
    <div>
      <Typography variant={"h1"}>My Profile</Typography>
      <Separator className="my-4" />

      <div className="mt-4">
        <ProfileForm defaultValues={data.profile} />
      </div>
    </div>
  );
};
