#!/bin/bash
# Upload build artifact to GitHub Releases
set -euo pipefail

export HOME=/home/ubuntu
export GITHUB_TOKEN=__gh_pat__

V=`/usr/bin/date +%Y%m%d`
N="${CI_PIPELINE_NUMBER:-0}"
ARTIFACT_NAME="react-tictactoe-build-${N}-${V}"
ARTIFACT_FILE="${ARTIFACT_NAME}.tar.gz"

echo "Creating artifact: ${ARTIFACT_FILE}"
cd build
tar czf "/tmp/${ARTIFACT_FILE}" .

echo "Uploading to GitHub Releases..."
gh release create "${ARTIFACT_NAME}" \
  "/tmp/${ARTIFACT_FILE}#${ARTIFACT_FILE}" \
  --repo imhobo/react-tictactoe \
  --title "Build ${N}-${V}" \
  --notes "Auto-built from commit ${CI_COMMIT_SHA:-unknown}" \
  2>/dev/null || \
gh release upload "${ARTIFACT_NAME}" \
  "/tmp/${ARTIFACT_FILE}#${ARTIFACT_FILE}" \
  --repo imhobo/react-tictactoe \
  --clobber

rm -f "/tmp/${ARTIFACT_FILE}"
echo "Artifact uploaded: ${ARTIFACT_NAME}"
