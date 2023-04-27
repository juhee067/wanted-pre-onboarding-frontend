import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  getChatTimes,
  getReplyTimes,
  getSpeakers,
} from "../../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../../store/reducer/selectedRoomIndexSlice";
import {
  AnalyzedMessage,
  ChatTimes,
  ReplyTime,
} from "../../../../@types/index.d";

let data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getTotalChatCounts = (chatTimes: any[]) => {
  let totalChatCounts = [];
  for (const chatroom of chatTimes) {
    const times = chatroom.flat();
    const timeSum = times.map((time: any) =>
      Object.values(time).reduce((a: any, b: any) => a + b)
    );
    totalChatCounts.push(timeSum.reduce((a: any, b: any) => a + b));
  }
  return totalChatCounts;
};

const PieChartExample = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const getTwoLettersFromSpeakers = (speakers: string[][]) => {
    let chatRoomNames = [];
    for (const chatroom of speakers) {
      chatRoomNames.push(
        chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join()
      );
    }
    return chatRoomNames;
  };
  const speakers = getSpeakers(analyzedMessages);
  const chatRoomNames = getTwoLettersFromSpeakers(speakers);

  const chatTimes = getChatTimes(analyzedMessages);
  const totalChatCounts = getTotalChatCounts(chatTimes);

  data = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });

  useEffect(() => {
    console.log(analyzedMessages, "analyzedMessages");
    // console.log(getSpeakers(analyzedMessages), "getSpeakers");
    // console.log(getChatTimes(analyzedMessages), "getChatTimes");
    // console.log(getKeywordCounts(analyzedMessages), "getKeywordCounts");
    console.log(getReplyTimes(analyzedMessages), "getReplyTimes");
    // console.log(getDates(analyzedMessages), "getDates");
  }, [analyzedMessages]);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  const [selectedChatRoomData, setSelectedChatRoomData] = useState<any>(null);
  // 저장된 시간별 채팅 횟수
  const calculateMostChattedTime = (
    chatTimes: any,
    mostChattedTimeArray: any,
    chatroomIndex: number
  ) => {
    chatTimes.forEach((chatTime: any) => {
      chatTime = Object.entries(chatTime);
      for (let i = 0; i < chatTime.length; i++) {
        const [hour, value] = [chatTime[i][0].slice(0, 2), chatTime[i][1]];
        const currentChatroom = mostChattedTimeArray[chatroomIndex];
        currentChatroom[hour]
          ? (currentChatroom[hour] += value)
          : (currentChatroom[hour] = value);
      }
    });
  };
  // 각 채팅방(chatroom)별로 가장 많이 채팅이 이루어진 시간을 계산
  const getMostChattedTimes = (chatTimes: any[]) => {
    const mostChattedTimeArray: any = [];
    let chatroomIndex = 0;
    for (const chatroom of chatTimes) {
      mostChattedTimeArray.push({});
      const chatTimes = chatroom.flat();
      calculateMostChattedTime(chatTimes, mostChattedTimeArray, chatroomIndex);
      chatroomIndex++;
    }
    const mostChattedTimes = mostChattedTimeArray.map(
      (chatTimes: Record<string, number>) => {
        return Object.entries(chatTimes).sort(
          (a: any, b: any) => b[1] - a[1]
        )[0];
      }
    );
    return mostChattedTimes;
  };

  const mostChattedTimes = getMostChattedTimes(chatTimes);

  const getAverageReplyTime = (replyTimes: any) => {
    const averageReplyTimeArray = [];
    for (const chatroom of replyTimes) {
      const averageReplyTime: number[] = chatroom.map((times: ReplyTime[]) => {
        const averageReplyTime = times.reduce(
          (acc: number, cur: ReplyTime) =>
            acc + (cur.difference / cur.count || 0),
          times[0].difference / times[0].count || 0
        );
        return Math.floor(averageReplyTime / times.length);
      });
      averageReplyTimeArray.push(averageReplyTime);
    }
    return averageReplyTimeArray;
  };
  const replyTimes = getReplyTimes(analyzedMessages);
  const averageReplyTime = getAverageReplyTime(replyTimes);

  // 대화자별로 chatTimes를 통해 10분 단위로 채팅한 횟수를 계산하는 함수
  // function calculateChatCountByTime(data) {
  //   const chatCounts = new Map();
  //   data.forEach((chatArray) => {
  //     chatArray.forEach((chatObj) => {
  //       const speaker = chatObj.speaker;
  //       const chatTimes = chatObj.chatTimes;
  //       Object.keys(chatTimes).forEach((time) => {
  //         const hour = parseInt(time.split(":")[0]);
  //         const minute = parseInt(time.split(":")[1]);
  //         const timeInMinutes = hour * 60 + minute;
  //         const count = chatTimes[time];
  //         const key = Math.floor(timeInMinutes / 10) * 10;
  //         if (chatCounts.has(speaker)) {
  //           if (chatCounts.get(speaker).has(key)) {
  //             chatCounts
  //               .get(speaker)
  //               .set(key, chatCounts.get(speaker).get(key) + count);
  //           } else {
  //             chatCounts.get(speaker).set(key, count);
  //           }
  //         } else {
  //           const chatCountMap = new Map();
  //           chatCountMap.set(key, count);
  //           chatCounts.set(speaker, chatCountMap);
  //         }
  //       });
  //     });
  //   });
  //   return chatCounts;
  // }

  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
      averageReplyTime: averageReplyTime[selectedChatRoomIndex],
    });
    console.log(analyzedMessages[selectedChatRoomIndex], "currentChatroom");
    console.log(selectedChatRoomData, "selectedChatRoomData");
    console.log(
      averageReplyTime[selectedChatRoomIndex],
      "averageReplyTime[selectedChatRoomIndex]"
    );
  }, [selectedChatRoomIndex]);

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={0}
          outerRadius={100}
          dataKey="value"
          labelLine
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              onClick={() => handleClickChatRoom(index)}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" />
      </PieChart>
      {selectedChatRoomData && (
        <div>
          <div>대화 수: {selectedChatRoomData.totalChatCount}</div>
          <div>대화자: {selectedChatRoomData.speakers.join(",")}</div>
          <div>대화자 수: {selectedChatRoomData.speakerCount}</div>
          <div>
            가장 많은 대화 시간대: {selectedChatRoomData.mostChattedTimes[0]}시
            (대화수: {selectedChatRoomData.mostChattedTimes[1]})
          </div>
          <div>
            일 평균 답장 시간
            <div>
              {selectedChatRoomData.speakers.map(
                (speaker: any, index: number) => {
                  return (
                    <div>
                      {speaker}: {selectedChatRoomData.averageReplyTime[index]}
                      초
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PieChartExample;
