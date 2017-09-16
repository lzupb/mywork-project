package com.pengbo.sample.live;

import java.util.UUID;

import com.baidubce.BceClientConfiguration;
import com.baidubce.auth.DefaultBceCredentials;
import com.baidubce.services.lss.LssClient;
import com.baidubce.services.lss.model.GetPresetResponse;
import com.baidubce.services.lss.model.GetSessionResponse;
import com.baidubce.services.lss.model.ListSessionsResponse;
import com.baidubce.services.lss.model.LiveInfo;

public class LssClientMain {

	public static void main(String[] args) {
		String ACCESS_KEY_ID = "abcd";
		String SECRET_ACCESS_KEY = "efgh";

		// 初始化一个LssClient
		BceClientConfiguration config = new BceClientConfiguration();
		config.setCredentials(new DefaultBceCredentials(ACCESS_KEY_ID,
				SECRET_ACCESS_KEY));
		LssClient client = new LssClient(config);

		GetPresetResponse gpresp = client
				.getPreset("lss.rtmp_hls_forward_only");
		System.out.println("presetName: " + gpresp.getPresetName());
		System.out.println("description: " + gpresp.getDescription());
		System.out.println("createTime: " + gpresp.getCreateTime());
		System.out.println("userId: " + gpresp.getUserId());

		ListSessionsResponse lsresp = client.listSessions();
		for (LiveInfo liveInfo : lsresp.getLiveInfos()) {
			System.out.println("=======================================");
			System.out.println("sessionId: " + liveInfo.getSessionId());
			System.out.println("presetName: " + liveInfo.getPresetName());
			System.out.println("description: " + liveInfo.getDescription());
			System.out.println("createTime: " + liveInfo.getCreateTime());
			System.out.println("userId: " + liveInfo.getUserId());
			System.out.println("status: " + liveInfo.getStatus());
			System.out.println("streamingStatus: "
					+ liveInfo.getStreamingStatus());
			System.out
					.println("pushUrl: " + liveInfo.getPublish().getPushUrl());
			System.out.println("liveHlsUrl: " + liveInfo.getPlay().getHlsUrl());
			System.out.println("liveRtmpUrl: "
					+ liveInfo.getPlay().getRtmpUrl());
			System.out.println("liveRtmpKey: "
					+ liveInfo.getPlay().getRtmpKey());

		}
		
		System.out.println("***************************************");

		GetSessionResponse session = client.getSession("lve-fkrga0zg97xsuxge");
		System.out.println("session.getStatus: "
				+ session.getStatus());//READY,PAUSED,ONGOING
		System.out.println("session.getStreamingStatus: "
				+ session.getStreamingStatus());//STREAMING,null
		System.out.println("UUID.randomUUID().toString(): "
				+ UUID.randomUUID().toString());
//		RefreshSessionResponse rsresp = client.refreshSession("lve-fktg3v98chsiiuf7");
//		System.out.println("=======================================");
//
//	    System.out.println("sessionId: " + rsresp.getSessionId());
//	    System.out.println("presetName: " + rsresp.getPresetName());
//	    System.out.println("description: " + rsresp.getDescription());
//	    System.out.println("createTime: " + rsresp.getCreateTime());
//	    System.out.println("lastUpdateTime: " + rsresp.getLastUpdateTime());
//	    System.out.println("userId: " + rsresp.getUserId());
//	    System.out.println("status: " + rsresp.getStatus());
//	    System.out.println("streamingStatus: " + rsresp.getStreamingStatus());

//		 LiveTarget target = new
//		 LiveTarget().withBosBucket("lzupb-test-live-bucket").withUserDomain("test.fmusic.cn");
//		 LivePublishInfo info = new LivePublishInfo().withPushAuth(false);
//		 CreateSessionResponse csresp =
//		 client.createSession("lss.rtmp_hls_forward_only",
//				 UUID.randomUUID().toString(), null, info, target);
//		 System.out.println("sessionId: " + csresp.getSessionId());
//		 System.out.println("presetName: " + csresp.getPresetName());
//		 System.out.println("description: " + csresp.getDescription());
//		 System.out.println("createTime: " + csresp.getCreateTime());
//		 System.out.println("userId: " + csresp.getUserId());
//		 System.out.println("status: " + csresp.getStatus());
//		 System.out.println("streamingStatus: " +
//		 csresp.getStreamingStatus());
	}

}
