package tw.com.jarmanager.q2w.web.mode;

public class HeartBeatClientVO {
	private String beatID;
	private String fileName;
	private String jarFilePath;

	public String getJarFilePath() {
		return jarFilePath;
	}

	public void setJarFilePath(String jarFilePath) {
		this.jarFilePath = jarFilePath;
	}

	private long timeSeries;

	public String getBeatID() {
		return beatID;
	}

	public void setBeatID(String beatID) {
		this.beatID = beatID;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public long getTimeSeries() {
		return timeSeries;
	}

	public void setTimeSeries(long timeSeries) {
		this.timeSeries = timeSeries;
	}
}
