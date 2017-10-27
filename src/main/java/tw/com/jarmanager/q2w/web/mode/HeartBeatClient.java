package tw.com.jarmanager.q2w.web.mode;

public class HeartBeatClient {
	private String BeatID;
	private String FileName;
	private long TimeSeries;

	public String getBeatID() {
		return BeatID;
	}

	public void setBeatID(String beatID) {
		BeatID = beatID;
	}

	public String getFileName() {
		return FileName;
	}

	public void setFileName(String fileName) {
		FileName = fileName;
	}

	public long getTimeSeries() {
		return TimeSeries;
	}

	public void setTimeSeries(long timeSeries) {
		TimeSeries = timeSeries;
	}

}
