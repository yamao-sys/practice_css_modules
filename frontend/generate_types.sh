#!/bin/bash

ENDPOINT=""

function _usage() {
	echo "Usage: $(basename $0) -endpoint [ENDPOINT]"
	echo "  -e  				 		   EndPoint To Merge And Generate Types"
	echo "  -h                 print this help"
	exit 1
}

while getopts e:h OPT;
do
	case $OPT in
		'e') ENDPOINT=$OPTARG;;
		'h') _usage;;
		*) _usage;;
	esac
done

if [ -z "$ENDPOINT" ]; then
  echo "[ERROR] Please check options"
  _usage
fi

input_schema_path="./swagger/$ENDPOINT/actions.yml"
merged_schema_path="./swagger/$ENDPOINT/swagger.yml"
generated_type_path="api/$ENDPOINT"

# 指定のエンドポイントのスキーマファイルを統合
npx swagger-merger -i $input_schema_path -o $merged_schema_path

# 一つにまとめたymlをもとに型ファイルを作成(oオプションで直接$generated_type_pathすると、エラーになるため一旦tmpに作成してmvしている)
npx openapi2aspida -i $merged_schema_path -o tmp

# tmpに作成した型・APIクライアントファイルをapi/~に移動する
rm -rf $generated_type_path && mv tmp $generated_type_path

# 自動生成したファイルがあるためprettierを実行
npm run format
