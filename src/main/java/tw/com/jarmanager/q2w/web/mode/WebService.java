package tw.com.jarmanager.q2w.web.mode;

public class WebService {

//	private String action;
//	private String encode;
	private String url;
	private String type;
	private String format;

	private String apiMethod;
	private String apiVersion;
	private String apiGroup;
	private String apiAction;
	private String apiKey;
	private String sharedSecret;
//	public String getAction() {
//		return action;
//	}
//
//	public void setAction(String action) {
//		this.action = action;
//	}
//
//	public String getEncode() {
//		return encode;
//	}
//
//	public void setEncode(String encode) {
//		this.encode = encode;
//	}

	public String getApiMethod() {
		return apiMethod;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getSharedSecret() {
		return sharedSecret;
	}

	public void setSharedSecret(String sharedSecret) {
		this.sharedSecret = sharedSecret;
	}

	public void setApiMethod(String apiMethod) {
		this.apiMethod = apiMethod;
	}

	public String getApiVersion() {
		return apiVersion;
	}

	public void setApiVersion(String apiVersion) {
		this.apiVersion = apiVersion;
	}

	public String getApiGroup() {
		return apiGroup;
	}

	public void setApiGroup(String apiGroup) {
		this.apiGroup = apiGroup;
	}

	public String getApiAction() {
		return apiAction;
	}

	public void setApiAction(String apiAction) {
		this.apiAction = apiAction;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
}
