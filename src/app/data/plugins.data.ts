import {PluginData} from "./plugin.data";
import {GroupByPlugin} from "../plugins/groupBy.plugin";
import {TimeSyncPlugin} from "../plugins/timeSync.plugin";
import {CloudMetaDataPlugin} from "../plugins/cloudMetaData.plugin";
import {CoefficientPlugin} from "../plugins/coefficient.plugin";
import {CsvExportPlugin} from "../plugins/csvExport.plugin";
import {DividePlugin} from "../plugins/divide.plugin";
import {EMemPlugin} from "../plugins/eMem.plugin";
import {MockObservationsPlugin} from "../plugins/mockObservations.plugin";
import {ENetPlugin} from "../plugins/eNet.plugin";
import {MultiplyPlugin} from "../plugins/multiply.plugin";
import {RegexPlugin} from "../plugins/regex.plugin";
import {SciEPlugin} from "../plugins/sci-e.plugin";
import {SciPlugin} from "../plugins/sci.plugin";
import {SciMPlugin} from "../plugins/sci-m.plugin";
import {SciOPlugin} from "../plugins/sci-o.plugin";
import {ShellPlugin} from "../plugins/shell.plugin";
import {SumPlugin} from "../plugins/sum.plugin";
import {TdpFinderPlugin} from "../plugins/tdpFinder.plugin";
import {BoaviztaCPUPlugin} from "../plugins/boaviztaCPU.plugin";
import {BoaviztaCloudPlugin} from "../plugins/boaviztaCloud.plugin";
import {CcfPlugin} from "../plugins/ccf.plugin";
import {AzureImporterPlugin} from "../plugins/azureImporter.plugin";
import {Co2JsPlugin} from "../plugins/co2-js.plugin";
import {TeadsAwsPlugin} from "../plugins/teadsAws.plugin";
import {TeadsTdpCurvePlugin} from "../plugins/teadsTdpCurve.plugin";
import {WattTimePlugin} from "../plugins/wattTime.plugin";

export const PLUGINS: PluginData[] = [
    GroupByPlugin,
    TimeSyncPlugin,
    CloudMetaDataPlugin,
    CoefficientPlugin,
    CsvExportPlugin,
    DividePlugin,
    EMemPlugin,
    ENetPlugin,
    MockObservationsPlugin,
    MultiplyPlugin,
    RegexPlugin,
    SciPlugin,
    SciEPlugin,
    SciMPlugin,
    SciOPlugin,
    ShellPlugin,
    SumPlugin,
    TdpFinderPlugin,
    AzureImporterPlugin,
    BoaviztaCPUPlugin,
    BoaviztaCloudPlugin,
    CcfPlugin,
    Co2JsPlugin,
    TeadsAwsPlugin,
    TeadsTdpCurvePlugin,
    WattTimePlugin,
];
