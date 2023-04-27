import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../../../@types/index.d";
import {
  getChatTimes,
  getSpeakers,
} from "../../../../module/common/getProperties";
import { getTotalChatCounts } from "../pieGraphForSummary/PieGraphForSummary";

const COLORS = ["#FF414D", "#FF8991", "#F7ABB1"];

const Ratio = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const speakers = getSpeakers(results);
  const chatTime = getChatTimes(results);
  const totalChatCounts = getTotalChatCounts(chatTime);

  // 현재 채팅방 대화자 한명 대화수
  const speakerTotalChatCounts: Record<string, number> = {};

  for (const chatrooms of results) {
    Object.values(chatrooms).forEach((chatroom) => {
      Object.values(chatroom).forEach(
        (chat: { chatTimes: any; speaker: string }) => {
          const speaker = chat.speaker;
          if (!speakerTotalChatCounts[speaker]) {
            speakerTotalChatCounts[speaker] = 0;
          }
          const chatTimes = chat.chatTimes;
          const chatCounts = chatTimes ? Object.values(chatTimes) : [];
          const totalChatCount = chatCounts.reduce(
            (acc, count) => Number(acc) + Number(count),
            0
          );
          speakerTotalChatCounts[speaker] += Number(totalChatCount);
        }
      );
    });
  }
  console.log(speakerTotalChatCounts, "한명 당 대화 수");
  console.log(totalChatCounts, "전체 대화 수");

  let data = [
    { name: speakers[0][0], value: speakerTotalChatCounts[speakers[0][0]] },
    { name: speakers[0][1], value: speakerTotalChatCounts[speakers[0][1]] },
  ];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={0}
        outerRadius={100}
        dataKey="value"
        labelLine
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="horizontal" />
    </PieChart>
  );
};

export default Ratio;
