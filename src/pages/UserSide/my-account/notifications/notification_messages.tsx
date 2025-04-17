import { notificationAction } from "@/action/notification/notificationAction";
import Image from "@/components/global/image";
import Loader from "@/components/global/loader";
import MyClock from "@/components/myUi/MyClock";
import MyPageTab from "@/components/myUi/MyTab";
import { useUpdateNotificationStatus } from "@/hooks/use-notification";
import { useQueryData } from "@/hooks/useQueryData";
import { useAppSelector } from "@/redux/hook";
import { INotification } from "@/types/notification-types";

function NotificationMessages() {
  const { user } = useAppSelector((state) => state.auth);
  const { onReadNotification } = useUpdateNotificationStatus();

  const { data, isFetching } = useQueryData(["all-notifications"], () =>
    notificationAction(user?._id ?? "")
  );

  const { data: notification = [] } = (data ?? {}) as {
    status?: number;
    data?: INotification[];
  };

  if (isFetching) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50 animate-pulse shadow-inner gap-3">
        <Loader color="black" state={isFetching} />
      </div>
    );
  }

  //   console.log(notification, "notification");

  return (
    <div className="h-full overflow-auto scrollbar-thin">
      <div className="">
        <h5>User Notifications</h5>
      </div>
      {/* <pre>
        {JSON.stringify(notification,null,4)}
    </pre> */}
      {notification.length > 0 ? (
        <MyPageTab
          hiddenTabList={false}
          tabs={[
            {
              title: "New",
              url: "/my-account/notifications?type=new",
              value: "new",
              tabCss: "bg-gray-50 border-none shadow.xl",
              TriggerCss:
                "data-[state=active]:bg-gray-100 text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-black data-[state=active]:rounded-full ",
              children: (
                <div>
                  <ul className="flex flex-col gap-3">
                    {/* {notification.filter((item)=>!item.isRead).map((item, index) =>  ( */}
                    {notification.map((item, index) => (
                      <li
                        key={index}
                        className="p-3 w-full bg-gray-50 cursor-pointer text-black
                    hover:shadow-md duration-150 transition-all flex justify-between flex-wrap"
                        onClick={() => {
                          if (item.isRead) {
                            return;
                          }
                          onReadNotification({
                            id: item._id,
                            userId: user?._id ?? "",
                          });
                        }}
                      >
                        {/* {item._id} */}
                        <div className="flex gap-3">
                          {!item.isRead && (
                            <span className="w-2 h-2 animate-pulse rounded-full bg-bg"></span>
                          )}

                          <div className="flex flex-col capitalize">
                            <span className="text-black text-[16px]">
                              {item.title}
                            </span>
                            <span className=" text-xs">{item.message}</span>
                          </div>
                        </div>
                        <MyClock
                          date={item.createdAt}
                          use12Hour
                          showSeconds={false}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-3 ">
          <Image src="/img/icons/notification.svg" className="w-20" />
          <h4>No Notifications Yet.</h4>
        </div>
      )}
    </div>
  );
}

export default NotificationMessages;
