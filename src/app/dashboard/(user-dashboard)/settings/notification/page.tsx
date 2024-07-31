"use client";

import { Check, ChevronLeft } from "lucide-react";
import { getSession } from "next-auth/react";
import { useState, useEffect
} from "react";

import CustomButton from "~/components/common/common-button/common-button";
import NotificationSettingSavedModal from "~/components/common/modals/notification-settings-saved";
import NotificationHeader from "./_components/header";
import { NotificationSwitchBox } from "./_components/notification-switch-box";
import { getApiUrl } from "~/utils/getApiUrl";
import { useToast } from "~/components/ui/use-toast";
import { useNotificationStore } from "./action/notification-store";
import { notificationSettingsProperties } from "./types/notification-settings.types";




const saveNotificationSettings = async (
  settings: notificationSettingsProperties,
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/api/v1/settings/notification-settings";
  const url = `${baseUrl}${endpoint}`;
  console.log(`url: ${url}`);

  try {
    // const session = await getSession();
    // const token = session.access_token;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error("Failed to save settings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};

const NotificationPage = () => {
  const { settings, updateSettings } = useNotificationStore();
  const [isOpen, setOpen] = useState(false);

  const handleToggleSwitch = (name: keyof typeof settings) => {
    updateSettings({ [name]: !settings[name] });
  };

  const handleSaveChanges = async () => {
    try {
      const session = await getSession();
      console.log("Session:", session); // Log the session object
      await saveNotificationSettings(settings);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSaveChanges = async () => {
  //   try {
  //     await saveNotificationSettings(settings);
  //     // console.log("Settings saved:", settings);
  //     setOpen(true);
  //   } catch {
  //     // console.error("Failed to save settings:", error);
  //     // Handle error, e.g., show a notification to the user
  //   }
  // };

  return (
    <>
    <main className="text-neutral-dark-2">
      <div className="mx-[24px] mb-[30px] flex w-fit items-center gap-1 md:hidden">
        <ChevronLeft size="18" className="text-muted-foreground" />
        <span className="font-[600] text-muted-foreground">Notification</span>
      </div>
      {/* NOTIFICATION ALERT */}
      <section>
        <NotificationHeader notificationTitle={"Notification Alert"} />
        <NotificationSwitchBox
          title={"Mobile push notifications"}
          description={
            "Receive push notifications on mentions and comments via your mobile app"
          }
          name="mobile_push_notifications"
          isChecked={settings.mobile_push_notifications}
          onToggle={handleToggleSwitch}
        />
      </section>
      {/* EMAIL NOTIFICATION */}
      <section className="my-[30px]">
        <NotificationHeader notificationTitle={"Email notifications"} />
        <section className="flex flex-col gap-[24px]">
          <NotificationSwitchBox
            title={"Activity in your workspace"}
            description={
              "Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes"
            }
            name="email_notification_activity_in_workspace"
            isChecked={settings.email_notification_activity_in_workspace}
            onToggle={handleToggleSwitch}
          />
          <NotificationSwitchBox
            title={"Always send email notifications"}
            description={
              "Receive emails about activity in your workspace, even when you are active on the app"
            }
            name="email_notification_always_send_email_notifications"
            isChecked={
              settings.email_notification_always_send_email_notifications
            }
            onToggle={handleToggleSwitch}
          />
          <NotificationSwitchBox
            title={"Email digests"}
            description={
              "Receive email digest every 8 hours for changes to pages you are subscribed to"
            }
            name="email_notification_email_digest"
            isChecked={settings.email_notification_email_digest}
            onToggle={handleToggleSwitch}
          />
          <NotificationSwitchBox
            title={"Announcements and update emails"}
            description={
              "Receive occasional emails about product launches and new features from notion"
            }
            name="email_notification_announcement_and_update_emails"
            isChecked={
              settings.email_notification_announcement_and_update_emails
            }
            onToggle={handleToggleSwitch}
          />
        </section>
      </section>
      {/* SLACK NOTIFICATIONS */}
      <section className="my-[30px]">
        <NotificationHeader notificationTitle={"Slack notifications"} />
        <section className="flex flex-col gap-[24px]">
          <NotificationSwitchBox
            title={"Activity in your workspace"}
            description={
              "Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes"
            }
            name="slack_notifications_activity_on_your_workspace"
            isChecked={settings.slack_notifications_activity_on_your_workspace}
            onToggle={handleToggleSwitch}
          />
          <NotificationSwitchBox
            title={"Always send email notifications"}
            description={
              "Receive emails about activity in your workspace, even when you are active on the app"
            }
            name="slack_notifications_always_send_email_notifications"
            isChecked={
              settings.slack_notifications_always_send_email_notifications
            }
            onToggle={handleToggleSwitch}
          />
          <NotificationSwitchBox
            title={"Announcements and update emails"}
            description={
              "Receive email digest every 8 hours for changes to pages you are subscribed to"
            }
            name="slack_notifications_announcement_and_update_emails"
            isChecked={
              settings.slack_notifications_announcement_and_update_emails
            }
            onToggle={handleToggleSwitch}
          />
        </section>
      </section>
      <section className="text-center md:text-end">
        <CustomButton
          variant="primary"
          icon={<Check />}
          isLeftIconVisible={true}
          onClick={handleSaveChanges}
        >
          Save Changes
        </CustomButton>
      </section>
      <NotificationSettingSavedModal
        show={isOpen}
        onClose={() => setOpen(false)}
      />
    </main>
    </>
    
  );
};

export default NotificationPage;
