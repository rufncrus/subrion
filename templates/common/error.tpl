<div class="alert alert-error">{$message}</div>

{if 404 == $code}
	<div class="google_suggestions" id="google_suggestions">
		<script type="text/javascript">
			var GOOG_FIXURL_LANG = '{$smarty.const.IA_LANGUAGE}';
			var GOOG_FIXURL_SITE = '{$smarty.const.IA_URL}';
		</script>
		<script type="text/javascript" src="http://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
	</div>
{/if}

{ia_hooker name='smartyFrontErrorPage'}