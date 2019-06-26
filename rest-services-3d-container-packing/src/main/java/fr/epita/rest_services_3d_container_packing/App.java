package fr.epita.rest_services_3d_container_packing;

import com.github.skjolberg.packing.*;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class App 
{
    public static void main( String[] args )
    {
    	List<Container> containers = new ArrayList<Container>();
        containers.add(new Container(10000, 10000, 1000, 10000)); // x y z and weight

        /*try {
            Map<String, String> values = new CSVReaderHeaderAware(new FileReader("Assets/Box_produced_BricoPrive_1_CastelnaudEstretefonds_FR_V5_14_2019-06-03.csv")).readMap();

            for (String s : values.keySet()){
                System.out.println("k: " + s + "\nval: " + values.get(s));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }*/

        Packager packager = new LargestAreaFitFirstPackager(containers);
        System.out.println("list of containers: ");
        for (Container con : containers) {
            System.out.println("- width: " + con.getWidth() + ", depth:" + con.getDepth() + ", height: " + con.getHeight() + ", weight: " + con.getWeight());
        }

        List<BoxItem> products = new ArrayList<BoxItem>();
        products.add(new BoxItem(new Box("Foot", 6, 7, 50, 25), 1));
        products.add(new BoxItem(new Box("Leg", 4, 8, 1, 25), 1));
        products.add(new BoxItem(new Box("Arm", 4, 4, 2, 20), 1));
        products.add(new BoxItem(new Box("Leg", 4, 8, 1, 25), 1));
        products.add(new BoxItem(new Box("Arm", 4, 4, 2, 20), 1));
        products.add(new BoxItem(new Box("Leg", 4, 8, 1, 25), 1));
        products.add(new BoxItem(new Box("Arm", 4, 4, 2, 20), 1));
        products.add(new BoxItem(new Box("Leg", 4, 8, 1, 25), 1));
        products.add(new BoxItem(new Box("Arm", 4, 4, 2, 20), 1));


        System.out.println("First test");

        Container match = packager.pack(products);
        print_result(match);


        System.out.println("Second test");
        products.remove(0);
        products.add(new BoxItem(new Box("hand", 6, 5, 1, 30), 1));
        
        match = packager.pack(products);
        print_result(match);
    }
    
    public static void print_result(Container match){
        String result = "";
        String show = "";

        if (match != null) {
            result = "success";
            //show = "FreeSpace: " + match.getFreeSpace();
            for (int i = 0; i < match.getLevels().size(); i++){
                Level le = match.getLevels().get(i);
                System.out.println("Level :" + i);
                for (Placement pl: le)
                    System.out.println("Space :" + pl.getSpace());
                System.out.println();
            }
        } else result = "failed";

        System.out.println("result: " + result + "\n" + show);
    }
}
