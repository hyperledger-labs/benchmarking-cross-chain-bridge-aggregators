#!/bin/bash
#!/bin/bash
echo "Running Hashi"
# Change directory to the location of the script
original_dir=$(pwd)
cd "$(dirname "$0")"

# Load environment variables
cd "$original_dir"
source .env

mode=$1
rpc=$2
op=$3
contract_path=$4
shift 4

while [[ $# -gt 0 ]]; do
    case "$1" in
        --source_chain)
            export HASHI_SOURCE_DOMAIN="$2"
            shift 2
            ;;
        --dest_chain)
            export HASHI_DESTINATION_DOMAIN="$2"
            shift 2
            ;;
        --yaho_source)
            export HASHI_YAHO_SOURCE="$2"
            shift 2
            ;;
        --hashi_dest)
            export HASHI_HASHI_DEST="$2"
            shift 2
            ;;
        --amb_relay)
            export HASHI_AMB_RELAY_SOURCE="$2"
            shift 2
            ;;
        --amb_adapter)
            export HASHI_AMB_ADAPTER_DEST="$2"
            shift 2
            ;;
        --number)
            export HASHI_NUMBER="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [[ $op == "deploy" ]]; then
    verify="--verify"
elif [[ $op == "send" || $op == "call" ]]; then
    verify=""
fi

echo "Sending the source transaction"

BASE_COMMAND="forge script script/Hashi/$contract_path --rpc-url $rpc -vv"

# Check if --broadcast flag should be included
if [ "$mode" == "broadcast" ]; then
    FULL_COMMAND="$BASE_COMMAND --broadcast ${verify}"
    export TEST=false
else
    FULL_COMMAND="$BASE_COMMAND"
    export TEST=true
fi

# Execute the constructed command
eval "$FULL_COMMAND"